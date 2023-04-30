class WebLinksController < ApplicationController
  def index
    @weblinks = WebLink.all
    render json: @weblinks
  end

  def create
    webLink = WebLink.create!(web_link_params)
    if webLink
      render json: webLink
    else
      render json: webLink.errors
    end
  end

  def update
  end

  def destroy
  end

  private

  def web_link_params
    params.require(:web_link).permit(:name, :web_url)
  end
end