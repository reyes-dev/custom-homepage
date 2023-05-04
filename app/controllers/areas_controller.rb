class AreasController < ApplicationController

    def index
      @areas = Area.all
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
    end
  
    def destroy
    end
  
    private
  
    def area_params
      params.require(:area).permit(:name)
    end
end
