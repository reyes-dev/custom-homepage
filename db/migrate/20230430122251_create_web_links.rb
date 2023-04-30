class CreateWebLinks < ActiveRecord::Migration[7.0]
  def change
    create_table :web_links do |t|
      t.string :name
      t.text :url

      t.timestamps
    end
  end
end
