FROM node


COPY . /opt/project-admin
WORKDIR /opt/project-admin

ENV PORT 3000

RUN npm config set registry https://registry.npm.taobao.org --global && \
    npm config set disturl https://npm.taobao.org/dist --global
RUN npm install


# 配置系统变量，指定端口
ENV HOST 0.0.0.0
ENV PORT 3000

EXPOSE 3000



# 容器启动命令
CMD ["npm", "start"]
