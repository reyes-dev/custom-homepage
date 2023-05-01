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
    web_link = WebLink.find(params[:id])
    web_link.update!(web_link_params)
    render json: web_link
  end

  def destroy
    web_link = WebLink.find(params[:id])
    web_link&.destroy
    render json: { message: 'Link deleted!' }
  end

  private

  def web_link_params
    params.require(:web_link).permit(:name, :web_url)
  end
end