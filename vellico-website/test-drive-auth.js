const { google } = require('googleapis');

async function testGoogleDriveAuth() {
    console.log('🚀 Starting Google Drive API authentication test...');
    
    try {
        const credentials = {
            client_id: '834274195030-q3is84bmr8q64ploqe75giagr293btbm.apps.googleusercontent.com',
            client_secret: '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',
            redirect_uris: ['urn:ietf:wg:oauth:2.0:oob']
        };
        
        const oauth2Client = new google.auth.OAuth2(
            credentials.client_id,
            credentials.client_secret,
            credentials.redirect_uris[0]
        );

        console.log('📝 OAuth2 client created successfully');
        
        // Try with second authorization code
        const authCode = '4/1AVMBsJiH9_Tnnp1pRjU2AgV0m2COarf7Q-H3ZXfcirxIFZV2VUhChwNatag';
        console.log('🔑 Attempting to exchange authorization code for tokens...');
        
        const { tokens } = await oauth2Client.getToken(authCode);
        console.log('✅ Successfully obtained tokens!');
        console.log('Token info:', {
            access_token: tokens.access_token ? 'Present' : 'Missing',
            refresh_token: tokens.refresh_token ? 'Present' : 'Missing',
            expiry_date: tokens.expiry_date
        });
        
        oauth2Client.setCredentials(tokens);
        
        // Test Drive API access
        const drive = google.drive({ version: 'v3', auth: oauth2Client });
        console.log('📂 Testing Drive API access...');
        
        // Search for "새 폴더" folder
        const response = await drive.files.list({
            q: `name='새 폴더' and mimeType='application/vnd.google-apps.folder'`,
            fields: 'files(id, name, parents)',
            pageSize: 10
        });
        
        console.log(`🔍 Found ${response.data.files.length} folder(s) named "새 폴더"`);
        
        for (const folder of response.data.files) {
            console.log(`📁 Folder: ${folder.name} (ID: ${folder.id})`);
            
            // List files in this folder
            const filesResponse = await drive.files.list({
                q: `'${folder.id}' in parents and trashed=false and mimeType contains 'image'`,
                fields: 'files(id, name, mimeType, size, modifiedTime)',
                orderBy: 'modifiedTime desc',
                pageSize: 20
            });
            
            console.log(`🖼️  Found ${filesResponse.data.files.length} image(s) in folder "${folder.name}"`);
            
            filesResponse.data.files.forEach((file, index) => {
                console.log(`   ${index + 1}. ${file.name} (${file.mimeType}) - ${file.size} bytes`);
            });
        }
        
        return { success: true, tokens, folders: response.data.files };
        
    } catch (error) {
        console.error('❌ Error:', error.message);
        
        if (error.message.includes('invalid_grant')) {
            console.log('💡 The authorization code may have expired. Please generate a new one.');
        }
        
        return { success: false, error: error.message };
    }
}

// Run the test
testGoogleDriveAuth().then(result => {
    if (result.success) {
        console.log('\n🎉 Google Drive API test completed successfully!');
    } else {
        console.log('\n💥 Google Drive API test failed.');
    }
});