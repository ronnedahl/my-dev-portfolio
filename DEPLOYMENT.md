# Deployment Guide

## 🚀 Production Deployment with Nginx

### Prerequisites
- Ubuntu/Debian server with nginx installed
- Existing SSL certificate for your domain
- PM2 installed globally (`npm install -g pm2`)

### Step 1: Build the Project
```bash
# Build for production
npm run build

# Verify build output
ls -la js/ css/
```

### Step 2: Upload Files to Server
```bash
# Upload to your server (adjust path and server details)
rsync -avz --exclude 'node_modules' --exclude 'src' --exclude '.git' \
  ./ user@your-server:/var/www/portfolio/
```

### Step 3: Nginx Configuration
```bash
# Copy nginx configuration
sudo cp /var/www/portfolio/nginx.conf /etc/nginx/sites-available/portfolio

# Create symlink to enable site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Test nginx configuration
sudo nginx -t

# Reload nginx
sudo systemctl reload nginx
```

### Step 4: Set Correct Permissions
```bash
# Set ownership
sudo chown -R www-data:www-data /var/www/portfolio/

# Set permissions
sudo chmod -R 755 /var/www/portfolio/
sudo chmod -R 644 /var/www/portfolio/*.html
sudo chmod -R 644 /var/www/portfolio/js/*.js
sudo chmod -R 644 /var/www/portfolio/css/**/*.css
```

### Step 5: SSL Certificate (if not already configured)
```bash
# Install certbot if needed
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d peterbot.dev -d www.peterbot.dev

# Test renewal
sudo certbot renew --dry-run
```

### Step 6: PM2 Setup (Optional - for Node.js processes)
```bash
# If you need PM2 for other services
pm2 startup
pm2 save

# Monitor processes
pm2 status
pm2 logs
```

## 🔧 Configuration Notes

### Nginx Configuration Features:
- ✅ **SSL/TLS Security**: Modern cipher suites and protocols
- ✅ **Security Headers**: XSS, clickjacking, and content-type protection
- ✅ **Caching Strategy**: Optimized for static assets
- ✅ **Gzip Compression**: Reduced file sizes
- ✅ **Rate Limiting**: Contact form protection
- ✅ **Error Handling**: Graceful fallbacks

### Path Adjustments Needed:
1. **Document Root**: Change `/var/www/portfolio` to your actual path
2. **SSL Certificates**: Verify certificate paths match your setup
3. **Domain Name**: Replace `peterbot.dev` with your actual domain

### Custom Modifications:
```bash
# Edit nginx config
sudo nano /etc/nginx/sites-available/portfolio

# Key sections to customize:
# - server_name (your domain)
# - root (your file path)
# - ssl_certificate paths
```

## 📊 Performance Optimizations

### Implemented Optimizations:
- **Static File Caching**: 1-year cache for assets
- **Compression**: Gzip for text files
- **Security**: CSP headers for XSS protection
- **Font Loading**: CORS headers for external fonts
- **Image Optimization**: WebP fallback support

### Monitoring:
```bash
# Check nginx status
sudo systemctl status nginx

# Monitor access logs
sudo tail -f /var/log/nginx/access.log

# Monitor error logs
sudo tail -f /var/log/nginx/error.log
```

## 🔒 Security Checklist

- ✅ HTTPS redirect configured
- ✅ Security headers enabled
- ✅ Hidden sensitive files (.env, .md)
- ✅ Rate limiting for forms
- ✅ Modern SSL configuration
- ✅ CSP headers configured

## 🚨 Troubleshooting

### Common Issues:
1. **403 Forbidden**: Check file permissions
2. **SSL Errors**: Verify certificate paths
3. **404 Errors**: Check document root path
4. **CSS/JS Not Loading**: Check file paths and permissions

### Quick Fixes:
```bash
# Restart nginx
sudo systemctl restart nginx

# Check nginx syntax
sudo nginx -t

# View recent logs
sudo journalctl -u nginx --no-pager --lines 50
```

## 🔄 Updates

### Deploying Updates:
```bash
# 1. Build locally
npm run build

# 2. Upload changes
rsync -avz js/ css/ index.html user@server:/var/www/portfolio/

# 3. Clear browser cache or update version numbers
# No server restart needed for static files
```

---
**Ready for production!** 🎉