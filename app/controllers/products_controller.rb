class ProductsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
    def index
        render json: Product.all, status: :ok
    end

    def create
        product = Product.create(product_params)
        render json:product, status: :created
    end

    def update
        product = Product.find(params[:id])
        product.update(product_params)
        render json: product, status: :ok
    end

    def destroy
        Product.find(params[:id]).destroy
        head :no_content
    end

    private
    def product_params
        params.permit(:name, :description, :price, :image, :user_id)
    end

    def record_not_found
        render json:{error:"Product not found"}
    end
end
