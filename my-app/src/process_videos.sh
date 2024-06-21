#!/bin/bash

# Directory containing the original video files
input_dir="./assets"
# Directory to save the processed video files
output_dir="./output_videos"

# Create the output directory if it doesn't exist
mkdir -p "$output_dir"

# Loop through all mp4 files in the input directory
for input_file in "$input_dir"/*.mp4; 
do
  # Check if the file exists and is a regular file
  if [[ -f "$input_file" ]]; then
    # Extract the base name of the file (without directory path)
    base_name=$(basename "$input_file")
    
    # Define the output file path
    output_file="$output_dir/$base_name"
    
    # Process the file with FFmpeg
    ffmpeg -i "$input_file" -c:v libx264 -crf 23 -c:a aac -strict experimental -b:a 192k -movflags +faststart "$output_file"
    
    echo "Processed: $input_file -> $output_file"
  fi
done

echo "All video files have been processed."
