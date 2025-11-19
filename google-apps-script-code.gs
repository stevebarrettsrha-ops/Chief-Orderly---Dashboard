// ============================================
// CHIEF ORDERLY DASHBOARD - GOOGLE APPS SCRIPT
// ============================================
//
// SETUP INSTRUCTIONS:
// 1. Open Google Apps Script: https://script.google.com
// 2. Create a new project
// 3. Copy this entire code into the script editor
// 4. Update the SHEET_IDS object below with your actual Google Sheet IDs
// 5. Deploy as Web App:
//    - Click "Deploy" > "New deployment"
//    - Select "Web app" as type
//    - Set "Execute as" to "Me"
//    - Set "Who has access" to "Anyone"
//    - Click "Deploy"
//    - Copy the Web App URL and update CONFIG.SCRIPT_URL in index.html

// ============================================
// CONFIGURATION - UPDATE THESE WITH YOUR SHEET IDS
// ============================================

const SHEET_IDS = {
  // Main staff data sheet - Staff Monitor Dashboard
  STAFF: '15BXIEtJViCna0zQdrrPXHXqN2bkddPNNEFGcS33PUK0',

  // NEW SHEETS - Update these with the IDs from your Google Sheets URLs
  // The ID is the long string in the URL: /spreadsheets/d/[THIS-IS-THE-ID]/edit
  LEAVE_RECORDS: '1z1OZRPXqbVMBBZg4UacWK9a1H_KSdC7_srHbLZ0vKp0',
  SCHEDULE_DATA: '19Vc3_ntR6C1MadhbpjPZmWenOKbVrH_heqE_2Nxstd8',
  TIME_TRACKING: '1RTHfdCg0FvpbHKbbEz2pb1FJUoVZvKkRqqbuSb8VboY',

  // Credentials sheet (if used)
  CREDENTIALS: '1FFLLw_xoKqhyFVOAzcKGKcI-9UloOOuu'
};

// ============================================
// MAIN HANDLER - Processes all requests
// ============================================

function doGet(e) {
  try {
    const action = e.parameter.action;

    switch(action) {
      case 'getLeaves':
        return getLeavesFromSheet();
      case 'getSchedule':
        return getScheduleFromSheet();
      case 'getTimeTracking':
        return getTimeTrackingFromSheet();
      case 'getStaff':
        return getStaffFromSheet();
      default:
        // Default action: return staff data (for backwards compatibility)
        return getStaffFromSheet();
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    switch(action) {
      // Staff Data Actions (existing)
      case 'addRow':
        return addStaffRow(data.data);
      case 'updateRow':
        return updateStaffRow(data.rowIndex, data.data);
      case 'deleteRow':
        return deleteStaffRow(data.rowIndex);

      // Leave Management Actions
      case 'addLeave':
        return addLeaveRecord(data.leaveData);
      case 'updateLeave':
        return updateLeaveRecord(data.leaveId, data.leaveData);
      case 'deleteLeave':
        return deleteLeaveRecord(data.leaveId);

      // Schedule Actions
      case 'saveSchedule':
        return saveScheduleData(data.scheduleData);

      // Time Tracking Actions (NEW)
      case 'addTimeTracking':
        return addTimeTrackingRecord(data.timeTrackingData);

      default:
        return ContentService.createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Invalid action'
        })).setMimeType(ContentService.MimeType.JSON);
    }
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ============================================
// STAFF DATA FUNCTIONS (Existing)
// ============================================

function addStaffRow(data) {
  const sheet = SpreadsheetApp.openById(SHEET_IDS.STAFF).getActiveSheet();
  sheet.appendRow(data);
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success'
  })).setMimeType(ContentService.MimeType.JSON);
}

function updateStaffRow(rowIndex, data) {
  const sheet = SpreadsheetApp.openById(SHEET_IDS.STAFF).getActiveSheet();
  const range = sheet.getRange(rowIndex, 1, 1, data.length);
  range.setValues([data]);
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success'
  })).setMimeType(ContentService.MimeType.JSON);
}

function deleteStaffRow(rowIndex) {
  const sheet = SpreadsheetApp.openById(SHEET_IDS.STAFF).getActiveSheet();
  sheet.deleteRow(rowIndex);
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success'
  })).setMimeType(ContentService.MimeType.JSON);
}

function getStaffFromSheet() {
  const sheet = SpreadsheetApp.openById(SHEET_IDS.STAFF).getActiveSheet();
  const data = sheet.getDataRange().getValues();

  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    data: data
  })).setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// LEAVE RECORDS FUNCTIONS
// ============================================

function addLeaveRecord(leaveData) {
  const sheet = SpreadsheetApp.openById(SHEET_IDS.LEAVE_RECORDS).getActiveSheet();

  // Ensure headers exist
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'ID', 'Staff TRN', 'Staff Name', 'Leave Type',
      'Start Date', 'End Date', 'Reason', 'Status', 'Created At'
    ]);
  }

  // Add the leave record
  sheet.appendRow([
    leaveData.id,
    leaveData.staffId,
    leaveData.staffName || '',
    leaveData.leaveType,
    leaveData.startDate,
    leaveData.endDate,
    leaveData.reason,
    leaveData.status || 'pending',
    leaveData.createdAt
  ]);

  return ContentService.createTextOutput(JSON.stringify({
    status: 'success'
  })).setMimeType(ContentService.MimeType.JSON);
}

function getLeavesFromSheet() {
  const sheet = SpreadsheetApp.openById(SHEET_IDS.LEAVE_RECORDS).getActiveSheet();
  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      leaveData: []
    })).setMimeType(ContentService.MimeType.JSON);
  }

  const headers = data[0];
  const leaves = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    leaves.push({
      id: row[0],
      staffId: row[1],
      staffName: row[2],
      leaveType: row[3],
      startDate: row[4],
      endDate: row[5],
      reason: row[6],
      status: row[7],
      createdAt: row[8]
    });
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    leaveData: leaves
  })).setMimeType(ContentService.MimeType.JSON);
}

function updateLeaveRecord(leaveId, leaveData) {
  const sheet = SpreadsheetApp.openById(SHEET_IDS.LEAVE_RECORDS).getActiveSheet();
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == leaveId) {
      sheet.getRange(i + 1, 1, 1, 9).setValues([[
        leaveData.id,
        leaveData.staffId,
        leaveData.staffName || '',
        leaveData.leaveType,
        leaveData.startDate,
        leaveData.endDate,
        leaveData.reason,
        leaveData.status || 'pending',
        leaveData.createdAt
      ]]);
      break;
    }
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: 'success'
  })).setMimeType(ContentService.MimeType.JSON);
}

function deleteLeaveRecord(leaveId) {
  const sheet = SpreadsheetApp.openById(SHEET_IDS.LEAVE_RECORDS).getActiveSheet();
  const data = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][0] == leaveId) {
      sheet.deleteRow(i + 1);
      break;
    }
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: 'success'
  })).setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// SCHEDULE DATA FUNCTIONS
// ============================================

function saveScheduleData(scheduleData) {
  const sheet = SpreadsheetApp.openById(SHEET_IDS.SCHEDULE_DATA).getActiveSheet();

  // Clear existing data (or you could implement smarter merging)
  sheet.clear();

  // Add headers
  sheet.appendRow([
    'Date', 'Department', 'Staff TRN', 'Staff Name', 'Time In', 'Time Out'
  ]);

  // Add schedule entries
  for (const date in scheduleData) {
    const dateSchedule = scheduleData[date];
    for (const dept in dateSchedule) {
      const assignments = dateSchedule[dept];
      assignments.forEach(assignment => {
        sheet.appendRow([
          date,
          dept,
          assignment.staffId,
          assignment.staffName || '',
          assignment.timeIn,
          assignment.timeOut
        ]);
      });
    }
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: 'success'
  })).setMimeType(ContentService.MimeType.JSON);
}

function getScheduleFromSheet() {
  const sheet = SpreadsheetApp.openById(SHEET_IDS.SCHEDULE_DATA).getActiveSheet();
  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      scheduleData: {}
    })).setMimeType(ContentService.MimeType.JSON);
  }

  const scheduleData = {};

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const date = row[0];
    const dept = row[1];
    const staffId = row[2];
    const staffName = row[3];
    const timeIn = row[4];
    const timeOut = row[5];

    if (!scheduleData[date]) {
      scheduleData[date] = {};
    }
    if (!scheduleData[date][dept]) {
      scheduleData[date][dept] = [];
    }

    scheduleData[date][dept].push({
      staffId: staffId,
      staffName: staffName,
      timeIn: timeIn,
      timeOut: timeOut
    });
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    scheduleData: scheduleData
  })).setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// TIME TRACKING FUNCTIONS (NEW)
// ============================================

function addTimeTrackingRecord(timeTrackingData) {
  const sheet = SpreadsheetApp.openById(SHEET_IDS.TIME_TRACKING).getActiveSheet();

  // Ensure headers exist
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'ID', 'Type', 'Staff TRN', 'Staff Name',
      'Date', 'Amount', 'Hours', 'Notes', 'Timestamp'
    ]);
  }

  // Add the time tracking record
  sheet.appendRow([
    timeTrackingData.id,
    timeTrackingData.type,
    timeTrackingData.staffId,
    timeTrackingData.staffName,
    timeTrackingData.date,
    timeTrackingData.amount || '',
    timeTrackingData.hours || '',
    timeTrackingData.notes || '',
    timeTrackingData.timestamp
  ]);

  return ContentService.createTextOutput(JSON.stringify({
    status: 'success'
  })).setMimeType(ContentService.MimeType.JSON);
}

function getTimeTrackingFromSheet() {
  const sheet = SpreadsheetApp.openById(SHEET_IDS.TIME_TRACKING).getActiveSheet();
  const data = sheet.getDataRange().getValues();

  if (data.length <= 1) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      timeTrackingData: []
    })).setMimeType(ContentService.MimeType.JSON);
  }

  const records = [];

  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const record = {
      id: row[0],
      type: row[1],
      staffId: row[2],
      staffName: row[3],
      date: row[4],
      notes: row[7],
      timestamp: row[8]
    };

    // Add amount or hours based on what's present
    if (row[5]) record.amount = row[5];
    if (row[6]) record.hours = row[6];

    records.push(record);
  }

  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    timeTrackingData: records
  })).setMimeType(ContentService.MimeType.JSON);
}

// ============================================
// HELPER FUNCTIONS
// ============================================

// Add any additional helper functions here as needed
