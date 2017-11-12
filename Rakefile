require 'rubygems'
require 'bundler/setup'

require "ffaker"
require 'json'

desc "generate_dataset"
task :generate_dataset, [:size] do |t, args|
  args.with_defaults(size: 1000)

  puts args.size

  data = {
    "schema": {
      "id": {
        "type": "number"
      },
      "first_name": {
        "type": "text"
      },
      "last_name": {
        "type": "text"
      },
      "active": {
        "type": "boolean"
      },
      "date_of_birth": {
        "type": "date"
      }
    },
    "data": args.size.to_i.times.map do |i|
      {
        "offset":        i,
        "id":            i + 1,
        "first_name":    FFaker::Name.first_name,
        "last_name":     FFaker::Name.last_name,
        "email":         FFaker::Internet.email,
        "gender":        FFaker::Gender.random,
        "date_of_birth": rand(Date.civil(1980, 1, 1)..Date.civil(2017, 12, 31)),
        "active":        [false, true].sample
      }
    end
  }

  File.write("./src/data-#{args.size}.json", data.to_json) 
end