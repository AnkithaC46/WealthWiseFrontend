import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import userHook from "../hooks/userHook";
import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList";
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import { Categories } from "emoji-picker-react";
import CategoryForm from "../components/CategoryForm";

const Category = () => {
  userHook();
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [openAddCategoryModel, setOpenAddCategoryModel] = useState(false);
  const [openEditCategoryModel, setOpenEditCategoryModel] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategoryDetails = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
      if (response.status === 200) {
        console.log("categories", response.data);
        setCategoryData(response.data);
      }
    } catch (error) {
      console.error("Something went wrong.");
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryDetails();
  }, []);

  const handleAddCategory=async(category)=>{
       const {name,type,icon}=category;
       if(!name.trim()){
        toast.error("Category name is required");
        return;
       }
       const isDuplicate = categoryData.some((category)=>{
        return category.name.toLowerCase() === name.trim().toLowerCase();
       })
       if(isDuplicate){
        toast.error("Category Name already exists.")
        return;
       }
       try{
        const response =  await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY,{name,type,icon});
        if(response.status === 201){
          toast.success("category added successfully")
          setOpenAddCategoryModel(false)
          fetchCategoryDetails();

        }
       }catch(error){
        toast.error(error.response?.data?.message || "something went wrong! please try again");
       }
  }  
  const handleEditCategory=(category)=>{
    setSelectedCategory(category);
    setOpenEditCategoryModel(true);


  }
  const handleUpdateCategory=async (updated)=>{
    const {id,name,type,icon}=updated;
    if(!name.trim()){
        toast.error("Category name is required");
        return;
       }
      if(!id){
        toast.error("Category Id is missing for update");
        return;
       }

   try{
        await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id),{name,type,icon});

          
          setOpenEditCategoryModel(false)
          setSelectedCategory(null);
          toast.success("category updated successfully")
          fetchCategoryDetails();
          

       }catch(error){
        toast.error(error.response?.data?.message || "something went wrong! please try again");
       }
  }

  return (
    <Dashboard activeMenu="Category">
      <div className="my-5 mx-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl font-semibold">All Categories</h2>
          <button
            onClick={() => setOpenAddCategoryModel(true)}
            className="add-btn flex items-center gap-1 bg-blue-400 rounded p-3 text-white"
          >
            <Plus size={15} />
            Add Category
          </button>
        </div>
        <CategoryList categories={categoryData} onEditCategory={handleEditCategory} />
        <Modal
          isOpen={openAddCategoryModel}
          onClose={() => setOpenAddCategoryModel(false)}
          title="Add Category"
        >
          <CategoryForm onAddCategory={handleAddCategory}/>
        </Modal>
        <Modal
          isOpen={openEditCategoryModel}
          onClose={() => {setOpenEditCategoryModel(false);
            setSelectedCategory(null);
           }}
          title="Update Category"
        >
          <CategoryForm onAddCategory={handleUpdateCategory}
          isEditing={true}
          initialCategoryData={selectedCategory}

          />
        </Modal>
        
      </div>
    </Dashboard>
  );
};

export default Category;
