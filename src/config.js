//Config for API URL
const mock = {
    url: {
      mock_data: [
        {
          "TicketID": "3",
          "Type": "Epic",
          "Summary": "Dashboard View",
          "Status": "In progress",
          "CreatedDate": "09/Jul/19"
        },
        {
          "TicketID": "5",
          "Type": "Story",
          "Summary": "Multiple API calls to fetch items for dashboard view",
          "Status": "Done",
          "CreatedDate": "16/Jul/19"
        },
        {
          "TicketID": "15",
          "Type": "Bug",
          "Summary": "UI doesn't waits for all API calls to return a response before moving to next steps",
          "Status": "Ready for Dev",
          "CreatedDate": "18/Jul/19"
        },
        {
          "TicketID": "17",
          "Type": "Story",
          "Summary": "Sort the dashboard items based on criticality",
          "Status": "Done",
          "CreatedDate": "17/Nov/19"
        },
        {
          "TicketID": "34",
          "Type": "Bug",
          "Summary": "Dashboard UI sorts numbers as String - 100 and 111 listed before 2 and 22",
          "Status": "Ready for Dev",
          "CreatedDate": "22/Jul/19"
        },
        {
          "TicketID": "9",
          "Type": "Story",
          "Summary": "Apply locale specific language translation to dashboard items",
          "Status": "In progress",
          "CreatedDate": "20/Jul/19"
        },
        {
          "TicketID": "10",
          "Type": "Story",
          "Summary": "Apply appropriate color scheme to dashboard items based on criticality",
          "Status": "Ready for Dev",
          "CreatedDate": "20/Jul/19"
        }
      ]
    },
  };
  export const config = mock;
  