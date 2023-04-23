from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import pymysql

pymysql.install_as_MySQLdb()

from sqlalchemy import String, create_engine, Column, Integer
from sqlalchemy.orm import sessionmaker
from urllib.parse import quote_plus as urlquote



userName = "root"
password = "nanhu@123"
dbHost = "47.103.54.72"
dbPort = 3306
dbName = "pythonDemo"

# 配置数据库地址：数据库类型+数据库驱动名称://用户名:密码@机器地址:端口号/数据库名
engine = create_engine(url=f'mysql+pymysql://{userName}:{urlquote(password)}@{dbHost}:{dbPort}/{dbName}?charset=utf8', echo=True, future=True)
# 把当前的引擎绑定给这个会话；
# autocommit：是否自动提交 autoflush：是否自动刷新并加载数据库 bind：绑定数据库引擎
Session = sessionmaker(autocommit=False, autoflush=True, bind=engine)
# 实例化
session = Session()

# # declarative_base类维持了一个从类到表的关系，通常一个应用使用一个Base实例，所有实体类都应该继承此类对象
from sqlalchemy.ext.declarative import declarative_base
 
Base = declarative_base()

# 按照月份的账单
class Billing(Base):
    # 定义表名
    __tablename__ = 'test2_view1'
    # 定义字段
    january = Column(Integer,primary_key=True)
    february = Column(Integer)
    march = Column(Integer)
    april = Column(Integer)
    may = Column(Integer)
    june = Column(Integer)

# amt
class Amt(Base):
    # 定义表名
    __tablename__ = 'test2_view2'
    # 定义字段
    amt1 = Column(Integer,primary_key=True)
    amt2 = Column(Integer)
    amt3 = Column(Integer)
    amt4 = Column(Integer)
    amt5 = Column(Integer)
    amt6 = Column(Integer) 

# 性别比例
class Sexual(Base):
    # 定义表名
    __tablename__ = 'test2_view3'
    # 定义字段
    sex1 = Column(String(255),primary_key=True)
    sex2 = Column(String(255))

# 不同学历的违约数
class Qualification(Base):
    # 定义表名
    __tablename__ = 'test2_view4'
    # 定义字段
    qual1sum = Column(Integer,primary_key=True)
    qual2sum = Column(Integer)
    qual3sum = Column(Integer)

# 概览
class Overview(Base):
    # 定义表名
    __tablename__ = 'test2_view5'
    # 定义字段
    sumcount = Column(Integer,primary_key=True)
    sumCred = Column(Integer)
    diyi = Column(Integer)
    dier = Column(Integer)
    disan = Column(Integer)
    disi = Column(Integer)
    diwu = Column(Integer)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/billing")
async def queryUserByUserId():
    # 查询不用月份的账单
    try:
        result = session.query(Billing).all()
        session.close()
        # user1 是一个列表，内部元素为字典
        return {"code": "0000", "message": "请求成功", "data": result}
    except ArithmeticError:
        return {"code": "0002", "message": "数据库异常"}

@app.get("/amt")
async def queryUserByUserId():
    # 查询amt
    try:
        result = session.query(Amt).all()
        session.close()
        # user1 是一个列表，内部元素为字典
        return {"code": "0000", "message": "请求成功", "data": result}
    except ArithmeticError:
        return {"code": "0002", "message": "数据库异常"}
    
@app.get("/sexual")
async def queryUserByUserId():
    # 查询性别比例
    try:
        result = session.query(Sexual).all()
        session.close()
        # user1 是一个列表，内部元素为字典
        return {"code": "0000", "message": "请求成功", "data": result}
    except ArithmeticError:
        return {"code": "0002", "message": "数据库异常"}
    
@app.get("/qualification")
async def queryUserByUserId():
    # 查询不同学历的违约情况
    try:
        result = session.query(Qualification).all()
        session.close()
        # user1 是一个列表，内部元素为字典
        return {"code": "0000", "message": "请求成功", "data": result}
    except ArithmeticError:
        return {"code": "0002", "message": "数据库异常"}
    
@app.get("/overview")
async def queryUserByUserId():
    # 查询概览
    try:
        result = session.query(Overview).all()
        session.close()
        # user1 是一个列表，内部元素为字典
        return {"code": "0000", "message": "请求成功", "data": result}
    except ArithmeticError:
        return {"code": "0002", "message": "数据库异常"}

app.mount("/", StaticFiles(directory="./front"), name="front")
if __name__ == '__main__':
   
    uvicorn.run(app=app,
                host="0.0.0.0",
                port=8082,
                workers=1)
