#!/usr/bin/env node

/**
 * Integration Test Script for Mental Health Platform
 * Tests the therapist booking system and Google Calendar integration
 */

const { spawn } = require('child_process');
const path = require('path');

console.log('🧪 Starting Integration Tests for Mental Health Platform\n');

// Test 1: Check if dependencies are installed
console.log('📦 Checking dependencies...');
const checkDeps = spawn('npm', ['list'], { cwd: __dirname, stdio: 'pipe' });

checkDeps.on('close', (code) => {
  if (code === 0) {
    console.log('✅ Dependencies are properly installed\n');
    
    // Test 2: Try to build the project
    console.log('🔨 Testing build process...');
    const build = spawn('npm', ['run', 'build'], { cwd: __dirname, stdio: 'inherit' });
    
    build.on('close', (buildCode) => {
      if (buildCode === 0) {
        console.log('\n✅ Build successful!\n');
        
        // Test 3: Start development server
        console.log('🚀 Starting development server...');
        console.log('📝 Manual testing checklist:');
        console.log('   1. Navigate to the therapist booking page');
        console.log('   2. Select a therapist and session type');
        console.log('   3. Choose a date and time');
        console.log('   4. Confirm booking and test Google Calendar integration');
        console.log('   5. Verify Meet link generation for video sessions\n');
        
        const dev = spawn('npm', ['run', 'dev'], { cwd: __dirname, stdio: 'inherit' });
        
        // Graceful shutdown on Ctrl+C
        process.on('SIGINT', () => {
          console.log('\n\n🛑 Shutting down development server...');
          dev.kill('SIGTERM');
          process.exit(0);
        });
        
      } else {
        console.log('\n❌ Build failed. Check the error messages above.');
        process.exit(1);
      }
    });
    
  } else {
    console.log('❌ Dependency issues detected. Run: npm install');
    process.exit(1);
  }
});

checkDeps.on('error', (err) => {
  console.error('❌ Error checking dependencies:', err.message);
  process.exit(1);
});
