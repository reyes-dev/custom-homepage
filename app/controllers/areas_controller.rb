class AreasController < ApplicationController
    def index
      @areas = Area.paginate(params[:pageNum])
      render json: @areas
    end

    def create
      area = Area.create!(area_params)
      if area
        render json: area
      else
        render json: area.errors
      end
    end
  
    def update
      area = Area.find(params[:id])
      area.update!(area_params)
      render json: area
    end
  
    def destroy
      area = Area.find(params[:id])
      area&.destroy
      render json: { message: 'Area deleted!' }
    end
  
    private
  
    def area_params
      params.require(:area).permit(:name)
    end
end
