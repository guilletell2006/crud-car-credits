# 🚗 Serverless CRUD - Car Credits API

Este proyecto implementa una **API REST Serverless** para gestionar créditos de autos (car credits) con **AWS Lambda**, **API Gateway** y **DynamoDB**, usando el **Serverless Framework**.

---

## 🧠 Descripción del proyecto

La API permite realizar operaciones CRUD (Create, Read, Update, Delete) sobre créditos de autos.  
Cada crédito almacena información del cliente, vehículo y condiciones del crédito.

### 🧾 Estructura de un crédito

```json
{
  "id": "uuid",
  "idClient": "123456789",
  "clientName": "John Doe",
  "phoneNumber": "+57 3001234567",
  "vehicle": {
    "plate": "ABC123",
    "brand": "Toyota",
    "model": "Corolla 2020"
  },
  "creditAmount": 40000000,
  "installments": 36,
  "installmentValue": 1500000,
  "createdAt": "2025-11-04T15:23:11.111Z"
}


⚙️ Tecnologías utilizadas
Node.js v20
AWS Lambda
AWS API Gateway
AWS DynamoDB
Serverless Framework
GitHub Actions (CI/CD)
Swagger / OpenAPI para documentación


🧩 Estructura del proyecto
serverless-crud-credits/
.
├── .github/
│   └── workflows/
│       └── deploy.yml              # Flujo de CI/CD para despliegue con GitHub Actions
├── node_modules/                   # Dependencias del proyecto (generado por npm)
├── src/                            # Código fuente principal
│   ├── application/
│   │   └── useCases/              # Casos de uso (lógica de negocio)
│   ├── domain/
│   │   └── repositories/          # Interfaces de repositorio del dominio
│   ├── infrastructure/            # Implementaciones técnicas (ej. acceso a datos, servicios externos)
│   ├── interfaces/
│   │   └── handlers/              # Handlers para operaciones CRUD
│   └── utils/                     # Funciones auxiliares y utilidades
├── test/
│   └── createCreditUseCase.test.js # Pruebas unitarias del caso de uso de creación de crédito
├── .gitignore                      # Archivos y carpetas ignoradas por Git
├── DesplieguePruebasUnitarias.jpg # Imagen ilustrativa del despliegue de pruebas
├── package.json                    # Configuración del proyecto Node.js
├── package-lock.json              # Mapa exacto de dependencias instaladas
├── README.md                       # Documentación del proyecto
└── serverless.yml                  # Configuración del Serverless Framework




🧱 Arquitectura
- **AWS Lambda + API Gateway**
- **DynamoDB (Pay-per-request)**
- **Serverless Framework**
- **CI/CD con GitHub Actions**

🌍 Ambientes
- **Dev:** Rama `develop` → `cars_credits_dev`
- **Prod:** Rama `master` → `cars_credits_prod`


🚀 Despliegue automático (CI/CD)
Cada git push a la rama main activa un workflow de GitHub Actions que:
Instala dependencias Node.js
Configura credenciales AWS
Ejecuta el comando serverless deploy
Despliega la API REST y la tabla DynamoDB automáticamente
Archivo de configuración del pipeline:
📁 .github/workflows/deploy.yml


🔑 Variables de entorno
En el archivo serverless.yml se definen las variables principales, entre ellas el nombre de la tabla DynamoDB:
provider:
  environment:
    DYNAMODB_TABLE: cars_credits


🧪 Endpoints principales
Método	Ruta	Descripción
POST	/new_credit 	Crear un nuevo crédito
GET	/get_credit/{id}	Obtener un crédito por ID
GET	/credits/{id}	    Obtener un crédito por ID de cliente
PUT	/update_credit/{id}	    Actualizar un crédito
DELETE	/delete_credit/{id}	Eliminar un crédito


🧰 Ejemplo de uso con Postman
Crear crédito
POST /new_credit
Body:
{
  "clientId": "123456789",
  "clientName": "John Doe",
  "phoneNumber": "+57 3001234567",
  "vehicle": {
    "plate": "XYZ987",
    "brand": "Mazda",
    "model": "CX5 2022"
  },
  "creditAmount": 60000000,
  "installments": 48,
  "installmentValue": 1600000
}


Respuesta esperada:
{
  "message": "✅ Credit successfully created in ${STAGE} 🚗💰",
  "credit": { ... }
}


📦 Cómo desplegar manualmente
Si quieres desplegar sin CI/CD:
npm install
serverless deploy

Esto desplegará la API en tu cuenta AWS, creando automáticamente en cada ambiente dev/prod:
Una función Lambda por cada endpoint.
Una tabla DynamoDB (cars_credits).
Un endpoint público de API Gateway.


✅ Mejoras aplicadas
** Reorganización del código siguiendo principios de arquitectura limpia
** Separación de lógica de negocio, acceso a datos y controladores
** Modularización de funciones Lambda
** Empaquetado individual optimizado

✅ Empaquetado optimizado con ESBuild nativo
** Eliminación del plugin externo serverless-esbuild
** Uso del empaquetado automático de Serverless Framework v4.23+
** Simplificación del serverless.yml
** Reducción de tamaño y tiempo de despliegue


🧑‍💻 Autor
Héctor Guillermo Dueñas Rojas
Desarrollador Backend | Arquitectura Cloud & Serverless
📍 Colombia

🏁 Licencia

Proyecto de uso educativo — Serverless Guru Challenge 2025


---

