## LabApp

This is the LabApp web-based CS lab management application.

#### BACKEND SERVER
The server lives in: `./node-labapp`
Backend packages:
 * express
 * cors
 * body-parser
 * express-session
 * connect-mongodb-session -- connects express-session to mongodb
 * google-auth-library -- to verify google tokens
 * nodemon -- for debugging
 * aws-sdk -- for accessing s3
 * multer -- file upload support
 * multer-s3 -- s3 backend for file upload


#### FRONTEND APPLICATION
The react front end lives in: `./react-labapp`
Frontend packages (these should get a link):
 * react
 * reactstrap -- bootstrap v4 for react
 * bootstrap -- bootstrap v4 (needed by reactstrap)
 * react-icons -- icon sets
 * react-dropzone -- file upload dropzone
 * filesize -- makes pretty file sizes
 * moment -- time computations

#### SAMPLE CODE
In `./prototypes` there are several sample applications.
