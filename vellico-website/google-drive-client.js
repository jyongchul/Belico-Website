const { google } = require('googleapis');
const fs = require('fs').promises;
const path = require('path');

class GoogleDriveClient {
    constructor() {
        this.credentials = {
            client_id: '834274195030-q3is84bmr8q64ploqe75giagr293btbm.apps.googleusercontent.com',
            client_secret: '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',
            redirect_uris: ['urn:ietf:wg:oauth:2.0:oob']
        };
        
        this.oauth2Client = new google.auth.OAuth2(
            this.credentials.client_id,
            this.credentials.client_secret,
            this.credentials.redirect_uris[0]
        );

        this.drive = google.drive({ version: 'v3', auth: this.oauth2Client });
    }

    // Generate auth URL for initial setup
    getAuthUrl() {
        const authUrl = this.oauth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: ['https://www.googleapis.com/auth/drive.readonly']
        });
        return authUrl;
    }

    // Set tokens from authorization code or stored tokens
    async setTokens(authCode = null, tokens = null) {
        try {
            if (authCode) {
                const { tokens: newTokens } = await this.oauth2Client.getToken(authCode);
                this.oauth2Client.setCredentials(newTokens);
                
                // Save tokens for future use
                await fs.writeFile(
                    path.join(__dirname, 'google-tokens.json'), 
                    JSON.stringify(newTokens, null, 2)
                );
                console.log('Tokens saved successfully');
                return newTokens;
            } else if (tokens) {
                this.oauth2Client.setCredentials(tokens);
                return tokens;
            }
        } catch (error) {
            console.error('Error setting tokens:', error.message);
            throw error;
        }
    }

    // Load saved tokens
    async loadTokens() {
        try {
            const tokensPath = path.join(__dirname, 'google-tokens.json');
            const tokens = JSON.parse(await fs.readFile(tokensPath, 'utf8'));
            this.oauth2Client.setCredentials(tokens);
            console.log('Tokens loaded successfully');
            return tokens;
        } catch (error) {
            console.log('No saved tokens found or error loading tokens');
            return null;
        }
    }

    // Search for folders by name
    async findFolderByName(folderName) {
        try {
            const response = await this.drive.files.list({
                q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder'`,
                fields: 'files(id, name, parents)'
            });
            
            return response.data.files;
        } catch (error) {
            console.error('Error searching for folder:', error.message);
            throw error;
        }
    }

    // List files in a folder
    async listFilesInFolder(folderId, mimeTypes = []) {
        try {
            let query = `'${folderId}' in parents and trashed=false`;
            
            if (mimeTypes.length > 0) {
                const mimeQuery = mimeTypes.map(type => `mimeType contains '${type}'`).join(' or ');
                query += ` and (${mimeQuery})`;
            }

            const response = await this.drive.files.list({
                q: query,
                fields: 'files(id, name, mimeType, size, modifiedTime, webViewLink, thumbnailLink)',
                orderBy: 'modifiedTime desc'
            });

            return response.data.files;
        } catch (error) {
            console.error('Error listing files:', error.message);
            throw error;
        }
    }

    // Download file content
    async downloadFile(fileId, fileName) {
        try {
            const response = await this.drive.files.get({
                fileId: fileId,
                alt: 'media'
            }, { responseType: 'stream' });

            const destPath = path.join(__dirname, 'public', 'images', 'new-folder', fileName);
            
            // Create directory if it doesn't exist
            await fs.mkdir(path.dirname(destPath), { recursive: true });
            
            return new Promise((resolve, reject) => {
                const writeStream = require('fs').createWriteStream(destPath);
                response.data.pipe(writeStream);
                
                writeStream.on('finish', () => {
                    console.log(`Downloaded: ${fileName}`);
                    resolve(destPath);
                });
                
                writeStream.on('error', reject);
            });
        } catch (error) {
            console.error(`Error downloading file ${fileName}:`, error.message);
            throw error;
        }
    }

    // Get all files from "새 폴더" folder
    async getNewFolderData() {
        try {
            console.log('Searching for "새 폴더"...');
            const folders = await this.findFolderByName('새 폴더');
            
            if (folders.length === 0) {
                console.log('No folder named "새 폴더" found');
                return [];
            }

            console.log(`Found ${folders.length} folder(s) named "새 폴더"`);
            
            const allFiles = [];
            for (const folder of folders) {
                console.log(`Checking folder: ${folder.name} (ID: ${folder.id})`);
                
                // Get images from the folder
                const files = await this.listFilesInFolder(folder.id, ['image']);
                console.log(`Found ${files.length} image files in folder ${folder.name}`);
                
                for (const file of files) {
                    allFiles.push({
                        ...file,
                        folderId: folder.id,
                        folderName: folder.name
                    });
                }
            }

            return allFiles;
        } catch (error) {
            console.error('Error getting new folder data:', error.message);
            throw error;
        }
    }
}

module.exports = GoogleDriveClient;