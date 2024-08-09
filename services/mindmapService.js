const SERVER_API = "https://2qyxjn-8080.csb.app/mindmaps";

export const getMindmap = async (id) => {
  try {
    const response = await fetch(`${SERVER_API}/${id}`);
    if (!response.ok) {
      throw new Error("Bạn chưa tạo Mindmap");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};

export const postMindmap = async (newMindmapData) => {
  try {
    const response = await fetch(`${SERVER_API}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMindmapData),
    });

    if (!response.ok) {
      throw new Error("Tạo Mindmap thất bại!");
    }

    return await response.json();
  } catch (error) {
    return error;
  }
};
export const updatedMindMap = async (id, newMindmapData) => {
  try {
    const response = await fetch(`${SERVER_API}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMindmapData),
    });
    if (!response.ok) {
      throw new Error("Cập nhật Mindmap thất bại!");
    }
    return await response.json();
  } catch (error) {
    return error;
  }
};
export const deleteMindmap = async (id) => {
  try {
    const response = await fetch(`${SERVER_API}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error("Xóa Mindmap thất bại");
    }
    return await response.json();
  } catch (error) {
    return error;
  }
};
