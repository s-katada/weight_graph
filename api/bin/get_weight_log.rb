#!/usr/bin/env ruby
require 'google/apis/calendar_v3'
require 'googleauth'

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

# イベントの取得
begin
  response = calendar_api.list_events('primary', max_results: 10,
                                            single_events: true,
                                            order_by: 'startTime',
                                            time_min: Time.now.iso8601)
  puts response
  puts 'Upcoming events:'
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
