export const createReport = async (formData) => {
    try {
      const create = await fetch(`${process.env.REACT_APP_SERVER}/api/reports`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      if (!create.ok) throw new Error("Something went wrong");
      const report = await create.json();
      console.log(report)
      return { report };
    } catch (error) {
      return { error };
    }
  };
  