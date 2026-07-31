import argparse
import polars as pl
import os
import sys
import io

if sys.platform == 'win32':
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

# Polars 1.x compatibility shims for PheTK
if not hasattr(pl.DataFrame, 'groupby'):
    pl.DataFrame.groupby = pl.DataFrame.group_by
if not hasattr(pl.Expr, 'map_dict'):
    pl.Expr.map_dict = lambda self, mapping, default=None: self.replace(mapping) if default is None else self.replace_strict(mapping, default=default)

def run_map(args):
    print(f"Running Mapping Step on {args.pheno_file}...")
    try:
        from PheTK.Phecode import Phecode
    except ImportError:
        print("Error: PheTK is not installed or accessible.")
        sys.exit(1)
        
    # Read the phenotype file, map columns to person_id, ICD, vocabulary_id
    try:
        df = pl.read_csv(args.pheno_file, null_values=["", "NA", "NaN"])
        # Rename columns based on args
        rename_map = {}
        if args.id_col != "person_id":
            rename_map[args.id_col] = "person_id"
        if args.icd_col != "ICD":
            rename_map[args.icd_col] = "ICD"
        if args.vocab_col and args.vocab_col != "vocabulary_id":
            rename_map[args.vocab_col] = "vocabulary_id"
            
        if rename_map:
            df = df.rename(rename_map)
            
        # Add vocabulary_id if it's missing (default to ICD9CM for simplicity if not provided)
        if "vocabulary_id" not in df.columns:
            df = df.with_columns(pl.lit("ICD9CM").alias("vocabulary_id"))
            
        # Cast person_id to int, ICD to string
        df = df.with_columns([
            pl.col("person_id").cast(pl.Int64, strict=False),
            pl.col("ICD").cast(pl.Utf8, strict=False)
        ])
        
        # Save temp file for Phecode to read
        temp_file = "temp_mapped_pheno.csv"
        df.write_csv(temp_file)
        
        # Run Phecode mapping
        phecode = Phecode(platform="custom", icd_df_path=temp_file)
        phecode.count_phecode(phecode_version="X", output_file_name=args.output_file)
        
        # Clean up
        if os.path.exists(temp_file):
            os.remove(temp_file)
            
        print("Mapping completed successfully.")
        
    except Exception as e:
        print(f"Error during mapping: {str(e)}")
        sys.exit(1)

def run_stats(args):
    print(f"Running Statistics Step on {args.cohort_file} and {args.phecode_file}...")
    try:
        from PheTK.PheWAS import PheWAS
    except ImportError:
        print("Error: PheTK is not installed or accessible.")
        sys.exit(1)
        
    try:
        # Pre-process cohort to ensure id column is person_id
        cohort = pl.read_csv(args.cohort_file)
        if args.id_col != "person_id":
            cohort = cohort.rename({args.id_col: "person_id"})
            
        # Identify sex column and convert M/F strings to 1/0 integers
        sex_col = "sex"
        for col in ["sex", "gender", "sex_at_birth", "Sex", "Gender"]:
            if col in cohort.columns:
                sex_col = col
                break
        if sex_col not in cohort.columns:
            cohort = cohort.with_columns(pl.lit(1).alias(sex_col))
            
        # Convert string gender M/F to 1/0 if needed
        if cohort[sex_col].dtype == pl.Utf8:
            cohort = cohort.with_columns(
                pl.when(pl.col(sex_col).str.to_uppercase().str.starts_with("M"))
                .then(1)
                .otherwise(0)
                .alias(sex_col)
            )
        cohort = cohort.with_columns([
            pl.col("person_id").cast(pl.Int64, strict=False),
            pl.col(sex_col).cast(pl.Int64, strict=False)
        ])
            
        temp_cohort = "temp_stats_cohort.csv"
        cohort.write_csv(temp_cohort)
        
        covariates = [c.strip() for c in args.covariates.split(',') if c.strip() and c.strip() in cohort.columns]
        if sex_col in covariates:
            covariates.remove(sex_col)
        
        phewas = PheWAS(
            cohort_csv_path=temp_cohort,
            phecode_count_csv_path=args.phecode_file,
            phecode_version="X",
            sex_at_birth_col=sex_col,
            covariate_cols=covariates,
            independent_variable_of_interest=args.independent_var,
            min_cases=1,
            min_phecode_count=1,
            output_file_name=args.output_file,
            verbose=True
        )
        
        phewas.run()
        
        if os.path.exists(temp_cohort):
            os.remove(temp_cohort)
            
        print("Statistics completed successfully.")
        
    except Exception as e:
        print(f"Error during stats: {str(e)}")
        sys.exit(1)

def run_plot(args):
    print(f"Running Plotting Step on {args.stats_file}...")
    try:
        from PheTK.Plot import Plot
    except ImportError:
        print("Error: PheTK is not installed or accessible.")
        sys.exit(1)
        
    try:
        plot = Plot(
            phewas_result_csv_path=args.stats_file,
            phecode_version="X"
        )
        
        output_name = args.output_file.replace(".png", "")
        plot.manhattan(
            save_plot=True,
            output_file_name=output_name,
            output_file_type="png",
            title="PheWAS Manhattan Plot"
        )
        print(f"Plot saved successfully to {args.output_file}")
        
    except Exception as e:
        print(f"Error during plotting: {str(e)}")
        sys.exit(1)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="PheTK Pipeline CLI")
    subparsers = parser.add_subparsers(dest="command", required=True)
    
    # Map command
    parser_map = subparsers.add_parser("map")
    parser_map.add_argument("--pheno-file", required=True)
    parser_map.add_argument("--id-col", required=True)
    parser_map.add_argument("--icd-col", required=True)
    parser_map.add_argument("--vocab-col", required=False)
    parser_map.add_argument("--output-file", required=True)
    
    # Stats command
    parser_stats = subparsers.add_parser("stats")
    parser_stats.add_argument("--cohort-file", required=True)
    parser_stats.add_argument("--phecode-file", required=True)
    parser_stats.add_argument("--id-col", required=True)
    parser_stats.add_argument("--independent-var", required=True)
    parser_stats.add_argument("--covariates", required=False, help="Comma separated list of covariates")
    parser_stats.add_argument("--output-file", required=True)
    
    # Plot command
    parser_plot = subparsers.add_parser("plot")
    parser_plot.add_argument("--stats-file", required=True)
    parser_plot.add_argument("--output-file", required=True)
    
    args = parser.parse_args()
    
    if args.command == "map":
        run_map(args)
    elif args.command == "stats":
        run_stats(args)
    elif args.command == "plot":
        run_plot(args)
