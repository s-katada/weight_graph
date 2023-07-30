#!/usr/bin/env ruby
require 'google/apis/calendar_v3'
require 'googleauth'
require 'dotenv/load'

# 認証フェーズ
scopes = [Google::Apis::CalendarV3::AUTH_CALENDAR_READONLY]
CREDENTIALS_PATH = 'bin/credentials.json'
credentials = Google::Auth::ServiceAccountCredentials.make_creds(
  json_key_io: File.open(CREDENTIALS_PATH),
  scope: scopes
)

credentials = credentials.fetch_access_token!

puts credentials

# Google Calendar APIクライアントのセットアップ
Calendar = Google::Apis::CalendarV3
calendar_api = Calendar::CalendarService.new
calendar_api.authorization = credentials
calendar_api.key = ENV['API_KEY']


# イベントの取得
begin
  response = calendar_api.list_events(ENV['CALENDAR_ID'],
                                      single_events: true,
                                      order_by: 'startTime',
                                      time_min: Time.new(2023, 5, 1).iso8601,
                                      time_max: Time.new(2023, 7, 31).iso8601)
  events = response.items
  events.each do |event|
    start = event.start.date_time || event.start.date
    puts "#{start} - #{event.summary}"
  end
rescue Google::Apis::AuthorizationError
  puts 'Authorization Error: Please check your credentials.'
rescue StandardError => e
  puts "Error fetching events: #{e.message}"
end
