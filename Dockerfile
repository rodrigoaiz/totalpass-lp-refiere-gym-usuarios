FROM httpd:2.4

# Copiar la configuración personalizada
COPY sitio.conf /usr/local/apache2/conf/sites-available/sitio.conf

# Copiar contenido HTML estático
COPY . /usr/local/apache2/htdocs/

# Crear el directorio sites-enabled si no existe
RUN mkdir -p /usr/local/apache2/conf/sites-enabled

# Configurar puerto y activar sitio
RUN echo "ServerName localhost" >> /usr/local/apache2/conf/httpd.conf && \
    sed -i 's/Listen 80/Listen 4322/' /usr/local/apache2/conf/httpd.conf && \
    ln -s /usr/local/apache2/conf/sites-available/sitio.conf /usr/local/apache2/conf/sites-enabled/ && \
    rm -f /usr/local/apache2/conf/sites-enabled/000-default.conf

EXPOSE 4322

CMD ["httpd", "-D", "FOREGROUND"]
