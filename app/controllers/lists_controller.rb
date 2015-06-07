class ListsController < ApplicationController
  before_action :set_list, only: [:show, :update, :update_title, :edit, :destroy]
  before_action :unknown_id_check, only: [:edit, :update, :destroy]
  before_action :load_json, only: [:edit, :update, :destroy]

  # GET /lists
  # GET /lists.json
  def index
  end

  # GET /lists/1
  # GET /lists/1.json
  def show
  end

  # GET /lists/new
  def new
    create
  end

  # GET /lists/1/edit
  def edit
  end

  # POST /lists
  # POST /lists.json
  def create
    @list = List.new()

    respond_to do |format|
      if @list.save
        format.html { redirect_to '/' + @list.key, notice: 'リストを作成しました' }
        format.json { render action: 'show', status: :created, location: @list }
      else
        format.html { render action: 'new' }
        format.json { render json: @list.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /lists/1
  # PATCH/PUT /lists/1.json
  def update
    lid = Time.now.strftime("%Y%m%d%H%M%S")
    @json_data = Hash[lid,params[:list][:data]].merge!(@json_data)
    # TODO:data がnilの場合
    if @list.update(data: @json_data.to_json)
      render json: { status: 'success', key: @list.key, lid: lid }
    else
      render json: { status: 'error'}
    end
  end

  def update_title
    respond_to do |format|
      if @list.update(title: params[:list][:title])
        format.html { redirect_to :back, notice: 'タイトルを編集しました' }
        format.json { render action: 'show', status: :created, location: @list }
      else
        format.html { render action: 'new' }
        format.json { render json: @list.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /lists/1
  # DELETE /lists/1.json
  def destroy
    unless params[:lid].nil?
      @json_data.delete(params[:lid])
      @list.update(data: @json_data.to_json)
      head :no_content
    else
      @list.destroy
      respond_to do |format|
        format.html { redirect_to root_path, notice: 'リストは削除されました' }
        format.json { head :no_content }
      end
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_list
      @list = List.find_by(key: params[:id])
    end

    def load_json
      @json_data = JSON.load(@list.data)
      @json_data = {} if @json_data.nil?
    end

    # unknown id redirect to top page
    def unknown_id_check
      return redirect_to :root, :alert => "リストがありません" if @list.nil?
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def list_params
      params.require(:list).permit(:key, :data)
    end
end
