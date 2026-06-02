# Instrucciones de Uso - Sistema COMPIN

## 🎯 Funcionalidades Implementadas

### Panel de Administración
- Gestión de clientes con sistema de cards responsivo
- Configuración de 4 etapas con fechas y estados
- Estados disponibles: **Verde** (Completado), **Azul** (En proceso), **Gris** (Pendiente)

### Vista del Cliente (Dashboard)
- Visualización de las 4 etapas del proceso
- Indicadores visuales con colores según el estado
- Barra de progreso con días transcurridos
- Fecha de última actualización

## 📋 Cómo Usar el Sistema

### 1. Acceso al Panel de Administración

1. Ve a la ruta `/admin` en tu navegador
2. Ingresa las credenciales:
   - **Usuario**: `admin`
   - **Contraseña**: `admin`

### 2. Agregar un Cliente

1. Haz clic en el botón **"Agregar Cliente"**
2. Completa el formulario:
   - **RUT**: Obligatorio (ej: 12345678-9)
   - **Fecha Etapa 1-4**: Opcional
   - **Estado Etapa 1-4**: Selecciona entre:
     - 🟢 **Verde**: Completado
     - 🔵 **Azul**: En proceso
     - ⚪ **Gris**: Pendiente
3. Haz clic en **"Guardar"**

### 3. Editar un Cliente

1. En la card del cliente, haz clic en el botón de **editar** (ícono de lápiz)
2. Modifica los campos necesarios
3. Cambia los estados de las etapas según el progreso
4. Haz clic en **"Actualizar"**

### 4. Eliminar un Cliente

1. En la card del cliente, haz clic en el botón de **eliminar** (ícono de papelera)
2. Confirma la eliminación

### 5. Vista del Cliente

1. El cliente ingresa su RUT en la página principal
2. Ingresa cualquier contraseña (por ahora no se valida)
3. Verá su dashboard con:
   - Las 4 etapas del proceso
   - Fechas de cada etapa
   - Estado visual de cada etapa (verde/azul/gris)
   - Días transcurridos desde la primera fecha
   - Fecha de última actualización

## 🎨 Estados de las Etapas

### Las 4 Etapas del Proceso

1. **Etapa 1**: Licencia Médica Recibida en la COMPIN
2. **Etapa 2**: Licencia Autorizada por Contraloría Médica
3. **Etapa 3**: Licencia en Evaluación de Subsidio
4. **Etapa 4**: Envío de la Licencia Médica a Pago

### Significado de los Estados

- 🟢 **Verde (Completado)**: La etapa ha sido finalizada exitosamente
- 🔵 **Azul (En proceso)**: La etapa está actualmente en progreso
- ⚪ **Gris (Pendiente)**: La etapa aún no ha comenzado

## 💾 Almacenamiento

Actualmente el sistema usa **localStorage** para almacenar los datos. Los datos persisten en el navegador pero son locales a cada dispositivo.

Para usar **Supabase** (base de datos en la nube):
1. Sigue las instrucciones en `SUPABASE-SETUP.md`
2. Configura las variables de entorno en `.env`
3. Los datos estarán sincronizados en todos los dispositivos

## 📱 Responsive Design

El sistema está completamente optimizado para:
- 💻 Desktop
- 📱 Tablets
- 📱 Móviles

Las cards se adaptan automáticamente al tamaño de pantalla.

## 🔐 Seguridad

- El panel de administración requiere autenticación
- Los clientes solo pueden ver sus propios datos
- Las políticas de Supabase protegen los datos en la nube

## 🚀 Próximos Pasos

1. Configurar Supabase para almacenamiento en la nube
2. Implementar autenticación real para clientes
3. Agregar notificaciones por email
4. Exportar reportes en PDF
