const express = require('express');
const router = express.Router();
const Attendance = require('../models/Attendance');
const mongoose = require('mongoose');

// Middleware to get current user
const getCurrentUser = (req, res, next) => {
  req.userId = req.headers['x-user-id'] || 'default-user-id';
  next();
};

// GET /api/attendance - Get attendance data for user
router.get('/', getCurrentUser, async (req, res) => {
  try {
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('⚠️ MongoDB not connected, returning mock data');
      // Return mock data when MongoDB is not connected
      const today = new Date();
      const { year, month } = req.query;
      
      // Generate mock data for the requested month/year
      let mockAttendance = [];
      if (year && month) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        const daysInMonth = endDate.getDate();
        
        // Generate some random attendance days
        for (let i = 1; i <= daysInMonth; i++) {
          if (Math.random() > 0.7) { // 30% chance of attendance
            const date = new Date(year, month - 1, i);
            mockAttendance.push({
              _id: `mock-attendance-${i}`,
              userId: req.userId,
              date: date.toISOString().split('T')[0],
              source: 'manual',
              createdAt: date.toISOString()
            });
          }
        }
      }
      
      return res.json({
        success: true,
        data: {
          attendance: mockAttendance,
          stats: {
            totalDays: mockAttendance.length,
            currentStreak: Math.min(mockAttendance.length, 7),
            thisMonth: mockAttendance.length
          }
        }
      });
    }

    const { year, month } = req.query;
    
    let query = { userId: req.userId };
    
    if (year && month) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);
      query.date = { $gte: startDate, $lte: endDate };
    }
    
    const attendance = await Attendance.find(query)
      .sort({ date: -1 });
    
    // Calculate streak and total days
    const allAttendance = await Attendance.find({ userId: req.userId })
      .sort({ date: -1 });
    
    let currentStreak = 0;
    let totalDays = allAttendance.length;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Calculate current streak
    for (let i = 0; i < allAttendance.length; i++) {
      const attendanceDate = new Date(allAttendance[i].date);
      attendanceDate.setHours(0, 0, 0, 0);
      
      const daysDiff = Math.floor((today - attendanceDate) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === i) {
        currentStreak++;
      } else {
        break;
      }
    }
    
    res.json({
      success: true,
      data: {
        attendance,
        stats: {
          totalDays,
          currentStreak,
          thisMonth: attendance.length
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch attendance data',
      error: error.message
    });
  }
});

// POST /api/attendance - Mark attendance for a specific date
router.post('/', getCurrentUser, async (req, res) => {
  try {
    const { date, source = 'manual' } = req.body;
    
    if (!date) {
      return res.status(400).json({
        success: false,
        message: 'Date is required'
      });
    }
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('⚠️ MongoDB not connected, returning mock success');
      return res.status(201).json({
        success: true,
        data: {
          _id: `mock-${Date.now()}`,
          userId: req.userId,
          date: date,
          source: source,
          createdAt: new Date().toISOString()
        },
        message: 'Attendance marked successfully (offline mode)'
      });
    }
    
    const attendanceDate = new Date(date);
    attendanceDate.setHours(0, 0, 0, 0);
    
    // Check if attendance already exists for this date
    const existingAttendance = await Attendance.findOne({
      userId: req.userId,
      date: attendanceDate
    });
    
    if (existingAttendance) {
      return res.json({
        success: true,
        data: existingAttendance,
        message: 'Attendance already marked for this date'
      });
    }
    
    const attendance = new Attendance({
      userId: req.userId,
      date: attendanceDate,
      source
    });
    
    await attendance.save();
    
    res.status(201).json({
      success: true,
      data: attendance,
      message: 'Attendance marked successfully'
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'Attendance already exists for this date'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to mark attendance',
      error: error.message
    });
  }
});

// DELETE /api/attendance/:id - Remove attendance record
router.delete('/:id', getCurrentUser, async (req, res) => {
  try {
    const attendanceId = req.params.id;
    
    const attendance = await Attendance.findOneAndDelete({
      _id: attendanceId,
      userId: req.userId
    });
    
    if (!attendance) {
      return res.status(404).json({
        success: false,
        message: 'Attendance record not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Attendance record deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to delete attendance record',
      error: error.message
    });
  }
});

module.exports = router;

