# MongoDB Setup on Windows

## MongoDB Installation

To install MongoDB on Windows, use the MSI installer found here:

https://www.mongodb.com/try/download/community

You can follow all default prompts and select the "Complete" installation. Make sure that you do not untick the box that will also install the MongoDB Compass application. We will need to use this program as our GUI.

## MongoDB Documentation

Official Documentation is found here:

https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/


## MongoDB Command Shell

After installing MongoDB you must install mongosh separately. Visit the page here:

https://www.mongodb.com/try/download/shell

Make sure to change Platform to Windows 64-bit (8.1+) (MSI) and download the MSI installer. Follow the prompts and leave all default settings. The MSI installer will set the PATH variable for you.

## Usage

To start/restart the MongoDB service:

    - From the Windows Services console, locate the MongoDB service.

    - Right-click on the MongoDB service and click Start.

To stop/pause the MongoDB service:

    - From the Windows Services console, locate the MongoDB service.

    - Right-click on the MongoDB service and click Stop (or Pause).

Running Mongo Command Shell

    Open your terminal application and run:

    ```sh
    mongosh
    ```