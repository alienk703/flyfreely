class TripsController < ApplicationController

  def index
    @trips = Trip.all
  end

  def new
    @trip = Trip.new
  end

  def show
    @trip = Trip.find( params[:id] )
  end

  def create
  @trip = Trip.new(params[:id])
    if @trip.save
      redirect_to @trip, notice: 'Trip was successfully saved'
    else
      render action:new
    end
  end

  def destroy
    @trip = Trip.find( params[:id] )
  end


end

