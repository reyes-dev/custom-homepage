class WebLinksController < ApplicationController
  before_action :set_web_link, only: %i[update, destroy]

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
    web_link = WebLink.find(params[:id])
    web_link.update!(web_link_params)
    render json: web_link
  end

  def destroy
  end

  private

  def web_link_params
    params.require(:web_link).permit(:name, :web_url)
  end

  def set_web_link
    @web_link = WebLink.find(params[:id])
  end
end