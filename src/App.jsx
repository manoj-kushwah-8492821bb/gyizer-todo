import toast from "react-hot-toast";
import Header from "./components/Header";
import { MdClose } from "react-icons/md";
import IconBtn from "./components/IconBtn";
import { AiOutlineInfo } from "react-icons/ai";
import InputField from "./components/InputField";
import React, { useEffect, useState } from "react";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import ConfrimationModal from "./components/ConfirmModal";

const App = () => {
  const [taskLists, setTaskLists] = useState([]);
  const [showMenu, setShowMenu] = useState(null);
  const [editData, setEditData] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [removeData, setRemoveData] = useState(null);

  const handleSavedTask = (data) => {
    setTaskLists(data);
    localStorage.setItem("taskLists", JSON.stringify(data));
  };

  // handle form input change
  const onChange = (event) => {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  };

  // handle form submit
  const onSubmit = (event) => {
    event.preventDefault();
    // Check if the title already exists in the task list
    const taskExists = taskLists.some(
      (task) => task.title === formValues.title
    );
    if (taskExists) {
      toast.error("Task has already added");
    } else {
      let updatedTasks;
      if (editData) {
        updatedTasks = taskLists.map((task) =>
          task.title === editData.title ? formValues : task
        );
      } else {
        updatedTasks = [...taskLists, formValues];
      }
      setFormValues({ title: "", about: "" });
      toast.success(`Task ${editData ? "updated" : "has saved"}`);
      setEditData(null);
      handleSavedTask(updatedTasks);
    }
  };

  // handle task removal
  const handleRemove = () => {
    const updatedTasks = taskLists.filter(
      (item) => item.title !== removeData.title
    );
    setRemoveData(null);
    toast.success("Task has removed");
    handleSavedTask(updatedTasks);
  };

  useEffect(() => {
    const storedTaskLists = localStorage.getItem("taskLists");
    if (storedTaskLists) {
      setTaskLists(JSON.parse(storedTaskLists));
    }
  }, []);

  return (
    <div>
      <Header />

      {/* Create a form in which title and value store */}
      <form
        onSubmit={onSubmit}
        className="max-w-2xl px-4 gap-2 py-10 sm:py-16 flex mx-auto"
      >
        <div className="w-full space-y-2">
          <InputField
            name="title"
            onChange={onChange}
            value={formValues?.title}
            placeholder="Title..."
          />
          <InputField
            name="about"
            type={editData ? "textarea" : "text"}
            onChange={onChange}
            value={formValues?.about}
            placeholder="About..."
          />
        </div>
        <button
          className={`rounded-lg bg-secondary border ${
            editData && "max-h-16 sm:max-h-20"
          } px-5 sm:px-8 py-3 border-primary flex justify-center items-center`}
          type="submit"
        >
          {editData ? "Update" : <FaPlus className="text-xl" />}
        </button>
      </form>

      {/* shows the task by map methods */}
      <div className="container mx-auto">
        <section className="sm:border-2 sm:min-h-80 sm:h-80 border-primary sm:bg-[#242320] sm:rounded-lg">
          {taskLists?.length > 0 ? (
            <div className="sm:p-10 md:p-14 px-4 grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {taskLists?.map((item, index) => {
                return (
                  <div className="rounded-lg flex items-center py-2 px-4 border-2 border-primary">
                    <div className="w-full">
                      <h3 className="text-lg sm:text-xl max-w-32 truncate">
                        {item.title}
                      </h3>
                      <div className="text-sm text-secondary max-w-48 truncate">
                        {item.about}
                      </div>
                    </div>
                    {/* Action */}
                    <div className="flex gap-2">
                      {showMenu == index ? (
                        <>
                          <IconBtn
                            event={() => setRemoveData(item)}
                            icon={<FaTrash />}
                          />
                          <IconBtn
                            event={() => {
                              setEditData(item);
                              setFormValues(item);
                            }}
                            icon={<FaPen />}
                          />
                          <IconBtn
                            event={() => {
                              setShowMenu(null);
                              setEditData(null);
                              setFormValues({ title: "", about: "" });
                            }}
                            icon={<MdClose />}
                          />
                        </>
                      ) : (
                        <IconBtn
                          event={() => setShowMenu(index)}
                          icon={<AiOutlineInfo />}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col h-full justify-center items-center ">
              {/* If No Tasks Here */}
              <div className="h-0.5 bg-primary w-16" />
              <h2 className="text-2xl font-bold text-center py-3">No Tasks</h2>
              <div className="h-0.5 bg-primary w-16" />
            </div>
          )}
        </section>
      </div>

      {/* take confirmation before remove */}
      {removeData && (
        <ConfrimationModal
          handleConfirm={handleRemove}
          handleCancel={() => {
            setRemoveData(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
