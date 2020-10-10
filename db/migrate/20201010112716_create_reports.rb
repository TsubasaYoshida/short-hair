class CreateReports < ActiveRecord::Migration[6.0]
  def change
    create_table :reports do |t|
      t.date :date, null: false
      t.text :impression

      t.timestamps
    end
  end
end
