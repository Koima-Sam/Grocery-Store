class SessionsController < ApplicationController
    # Log in an existing user
    def create
        user  = User.find_by(email: params[:email])
        # if user exists and has correct password
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user
        else
            render json: { errors: ["Invalid username or password"] }, status: :unauthorized
        end
    end

    # Logout the user
    def destroy
        user = User.find_by(id: session[:user_id])
        if user
            session.delete :user_id
            head :no_content
        else
            render json: {errors: ["Not authorized"]}, status: :unauthorized
        end
    end
    
end
