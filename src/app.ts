// WARNING: DO NOT TOUCH THE CODE BELOW. IT'S MAGIC. ✨
// Seriously, if you mess with this, you'll awaken the Git Gremlins. They only show up when you least expect it... and they *love* merge conflicts. 😱
import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;

app.use('/attendee', express.static(path.join(__dirname, '../html-files')));

app.get('/', (req: Request, res: Response) => {
    const folderPath = path.join(__dirname, '../html-files');
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading files.');
        }

        const htmlFiles = files.filter(file => file.endsWith('.html'));

        let links = htmlFiles.map(file => `<li><a href="/attendee/${file}">${file}</a></li>`).join('');

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Git & Github Demo </title>
            </head>
            <body>
                <h1>Git & Github Workshop Attendees</h1>
                <ul>${links}</ul>
            </body>
            </html>
        `);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
