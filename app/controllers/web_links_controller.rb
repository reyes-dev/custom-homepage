class WebLinksController < ApplicationController
  def index
    @weblinks = WebLink.all
    render json: @weblinks
  end

  def create
  end

  def update
  end

  def destroy
  end
end
