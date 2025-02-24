# Architecture
This project is using onion/clean architecture which consist of 3 layers: 
- Repository
- Services: use repository to get the data and apply business logic
- Actions: handles next js specific functions and handles the form validation
- Representation(UI): display the data into the UI

For complete example, life group entity will be our standard.

## Repository
Fetch data from data source(database, api). In our case, we will use the template that drizzle ORM has provided and the types that they have provided.

## Services
We apply business logic here including interaction with additional services (S3, logging, and other)

## Actions
We apply Next js specific functions such as caching and form validation.

# Folder structure
Based on the architecture that we use, we are going to structure the folder with a certain naming convention

```
+-- server
|   +-- services
|       +-- life_group_service.ts
|   +-- repository
|       +-- life_group_repository.ts
+-- actions
|   +-- life_group_actions.ts
```


# Technologies
- Next.js for the main framework
- Better auth for authentication
- Shadcn for ui library
- Conform for form validation
