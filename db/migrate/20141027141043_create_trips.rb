class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.string :trip_name
      t.date :date
      t.string :destination
      t.float :price
      t.timestamps
    end
  end
end
