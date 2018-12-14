require 'rubygems'
require 'bundler/setup'

require "ffaker"
require 'json'


desc "generate_dataset"
task :generate_dataset, [:size] do |t, args|
  args.with_defaults(size: 1000)

  puts args.size

  data = {
    "data": args.size.to_i.times.map do |i|
      {
        "id":            i + 1,
        "first_name":    fake_first_name,
        "last_name":     fake_last_name,
        "email":         fake_email,
        "website":       FFaker::Internet.domain_name,
        "ip":            FFaker::Internet.ip_v4_address,
        "gender":        fake_gender,
        "date_of_birth": fake_date,
        "active":        [false, true, nil].sample,
        "phone_number":  FFaker::PhoneNumberDE.phone_number,
        "currency":      FFaker::Currency.code,
        "job":           FFaker::Job.title,
        "duration":      ['PT2H3M56S', 'P2DT22H4M50S', nil].sample,
        "time":          [fake_time, fake_time, nil].sample,
        "created_at":    (DateTime.now - rand(1..1_000)).iso8601
      }
    end
  }

  File.write("./public/data-#{args.size}.json", data.to_json)
end

def fake_date
  a = 0.upto(5).to_a.shuffle

  i = a.first

  i == 0 ? nil : rand(Date.civil(1980, 1, 1)..Date.civil(2017, 12, 31))
end

def fake_time
  h = 0.upto(23).to_a.shuffle.first
  m = 0.upto(59).to_a.shuffle.first
  s = 0.upto(59).to_a.shuffle.first
  h = h < 10 ? "0#{h}" : h.to_s
  m = m < 10 ? "0#{m}" : m.to_s
  s = s < 10 ? "0#{s}" : s.to_s

  "#{h}:#{m}:#{s}"
end

def fake_first_name
  FFaker::Name.first_name
end

def fake_last_name
  FFaker::Name.last_name
end

def fake_email
  a = 0.upto(9).to_a.shuffle

  i = a.first

  case i
  when 0
    ''
  when 1
    nil
  else
    FFaker::Internet.email
  end
end

def fake_gender
  a = 0.upto(9).to_a.shuffle

  i = a.first

  i == 0 ? nil : FFaker::Gender.random
end
