import Request from "../../../helpers/Request";

export default function FetchData(
  query,
  setSnackbar,
  setSnackbarMessage,
  setSeverity,
  setNumOfEntries,
  type,
  filterProps
) {
  const data = new Promise(async (resolve, reject) => {
   
    const resp = await Request("get", "/api/training/records", null);
    if (resp.status !== 200) {
      setSeverity("error");
      setSnackbarMessage(resp?.data?.message);
      setSnackbar(true);
    } else {
      setSeverity("success");
      setSnackbarMessage(resp?.data?.message);
      setSnackbar(true);
      let otherData = resp.data.data;
      let data = otherData.content;
      let temp = [];
      for (let i = 0; i < data.length; i++) {
        const edit = {
          id: data[i].id,
          name: data[i].name,
          department: data[i].department,
          departmentId: data[i].department?.id,
          trainingTypeResponse: data[i].trainingTypeResponse,
          typeId: data[i]?.trainingTypeResponse?.id,
          status: data[i].status,
          startTime: data[i].startTime,
          endTime: data[i].endTime,
          plannedTime: data[i].plannedTime,
          isOnline: data[i].isOnline,
          meetingLink: data[i].meetingLink,
          instructors: data[i].instructors,
          attendees: data[i].attendees,
          files: data[i].files,
          meetingPlace: data[i].meetingPlace,
        };
        temp.push(edit);
      }

      setNumOfEntries(otherData.totalElements);
      resolve({
        data: temp,
        page: otherData.pageable.pageNumber,
        totalCount: otherData.totalElements,
      });
    }
  });

  return data;
}
