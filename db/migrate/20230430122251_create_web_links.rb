class CreateWebLinks < ActiveRecord::Migration[7.0]
  def change
    create_table :web_links do |t|
      t.string :name
      t.text :web_url

      t.timestamps
    end
  end
end
