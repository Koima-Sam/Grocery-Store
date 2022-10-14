class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :record_not_valid
    # Retrieve all users from the database
    def index
        render json: User.all, status: :ok
    end
    # create a new user with specified params
    # create a session cookie for  a created user 
    def create
        user = User.create(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end
    # get a logged in user details
    def show
        user = User.find_by(id:session[:user_id])
        if user
            render json:user
        else
            render json: {error:"Not authorized"}, status: :unauthorized
        end
    end

    # handle private methods
    private
    def record_not_valid(invalid)
        render json: {errors: invalid.record.errors}, status: :unprocessable_entity
    end

    # params that should be permitted when creating a new user
    def user_params
        params.permit(:name, :password_confirmation,:email, :password, :category,:phone)
    end

end
