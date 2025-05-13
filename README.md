---
languages:
- typescript
products:
- power-platform
- power-apps
page_type: sample
description: "This pcf app provides a way to reuse multiple AI Squared data apps by using a single solution."
---

## Summary

This pcf app provides a way to reuse multiple AI Squared data apps by using a single solution.

## Steps to build the solution

Install `dotnet`  
Using dotnet install `pac`  
Install `node`  
Install [mono](https://www.mono-project.com/download/stable/#download-mac)  
  
Go to the root directory  
  
Run `bun install`  
Then `bun run build`  
  
Use `bun run start` to test locally  
  
cd to the inner directory (cd DataAppsControl)    
Create a new directory that will contain the solution (the directory can have any name; Solutions is used as an example) and generate the solition:  
`mkdir AISDataAppSolutions`  
`cd AISDataAppSolutions`  
`pac solution init --publisher-name ai2NewPCF --publisher-prefix ai2new`  
`pac solution add-reference --path ../../`  
`dotnet build /p:Configuration=Release`  
  
After these the zip file will be available within the AISDataAppSolutions/bin/Debug directory  
  
Note: publisher-name & publisher-prefix needs to be substitued with the one's available from the target MS Dynamics env where the app is to be installed  


