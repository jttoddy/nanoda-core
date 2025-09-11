expected_file_path = "../.env"
expected_template_path = "../.env.template"

if File.exist?(expected_file_path)
  puts "Expected template present. Nothing to update."
  exit 0
end

if File.exist?(expected_template_path)
  puts "Looks like you forgot your .env file! I'll copy the template for you."
  FileUtils.cp(expected_template_path, expected_file_path)
end
