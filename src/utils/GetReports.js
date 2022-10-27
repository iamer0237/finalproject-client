export const getReports = async (formData) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_SERVER}/api/reports`);
      if (!res.ok) throw new Error("Something went wrong");
      const reports = await res.json();
      return { reports };
    } catch (error) {
      return { error };
    }
  };
  