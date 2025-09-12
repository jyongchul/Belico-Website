const GoogleDriveClient = require('./google-drive-client');

async function fetchNewFolderData() {
    const client = new GoogleDriveClient();
    
    try {
        // Try to load existing tokens first
        let tokens = await client.loadTokens();
        
        if (!tokens) {
            console.log('No existing tokens found. Attempting to use authorization code...');
            
            // Try using the provided authorization code
            const authCode = '4/1AVMBsJiH9_Tnnp1pRjU2AgV0m2COarf7Q-H3ZXfcirxIFZV2VUhChwNatag';
            
            try {
                tokens = await client.setTokens(authCode);
            } catch (error) {
                console.log('Authorization code expired or invalid.');
                console.log('Please visit this URL to get a new authorization code:');
                console.log(client.getAuthUrl());
                console.log('\nAfter getting the code, run this script again with the new code.');
                return null;
            }
        }

        console.log('Successfully authenticated with Google Drive API');
        
        // Get data from "새 폴더"
        const files = await client.getNewFolderData();
        
        if (files.length === 0) {
            console.log('No files found in "새 폴더"');
            return [];
        }

        console.log(`Found ${files.length} files in "새 폴더"`);
        console.log('\nFiles found:');
        files.forEach((file, index) => {
            console.log(`${index + 1}. ${file.name} (${file.mimeType}) - Modified: ${file.modifiedTime}`);
        });

        return files;

    } catch (error) {
        console.error('Error fetching Google Drive data:', error.message);
        
        if (error.message.includes('invalid_grant') || error.message.includes('expired')) {
            console.log('\nTokens have expired. Please get a new authorization code from:');
            console.log(client.getAuthUrl());
        }
        
        return null;
    }
}

// Run if called directly
if (require.main === module) {
    fetchNewFolderData().then(files => {
        if (files && files.length > 0) {
            console.log(`\n✅ Successfully found ${files.length} files in "새 폴더"`);
        } else {
            console.log('\n❌ No files found or authentication failed');
        }
    });
}

module.exports = fetchNewFolderData;