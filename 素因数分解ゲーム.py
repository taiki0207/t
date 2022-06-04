def prime_factorization(num):  # ある数を素因数分解してリスト化する関数を定義
    a =[]
    i=2
    while num >= i:
        if(num % i == 0):
            num /= i
            a.append(i)
            i = 1
        i+=1
    return a
  # ここまで
  # 参照サイト　Pythonで試し割り法　https://note.nkmk.me/python-prime-factorization/

def divisor(num):  #  ある数の約数から1を除いた集合を用意
    d = set()
    for i in range(1,num+1):
        if num%i == 0:
            d |= {i}
    d -= {1}
    return d

def cul(x):  # リストの数の総和を求める関数を定義
    s = 0
    for i in range(0,len(x)):
        s += x[i]
    return s

def make_random(level):  # レベルごとに異なる乱数を発生させる関数を定義
    if level == 0:
        import random
        n = random.randint(2,10)  # 簡単であれば10までの乱数
        return n
    elif level == 1:
        import random
        n = random.randint(2,100)  # 普通であれば100までの乱数
        return n
    else:
        import random
        n = random.randint(2,1000)  # 難しいであれば1000までの乱数
        return n

  # 参照元    
  # ここから
def down_timer(secs):  # スタートのタイマーを定義
    from time import sleep
    for i in range(secs, -1, -1):
        if i == 0:
            print('スタート！') 
            break
        print(i)
        sleep(1)
  # ここまで
  # 参照サイト　【Python入門】初心者に最適！Pythonで簡単なタイマーを作成しよう 
  # https://laboratory.kazuuu.net/create-a-simple-countdown-timer-in-python/
        
print('素因数分解ゲーム')
level = int(input('簡単:0 普通:1 難しい:2 数字を入力してください'))  # レベルを選択
score = 0
  # ゲームを実行
u = 3  # スタートのカウントダウンは3秒
t = 10  # 10回行う
down_timer(u)
while t>0:
    n = make_random(level)  # 生成された乱数をnに格納
    a = prime_factorization(n)  # 生成された乱数を素因数分解したリストを作成
    print(n,"= ",end="")
    b_list = []  # 入力された数をリスト化するために空のリストを用意
    b = 0
    for i in range(0,len(a)):
        b = int(input())
        b_list += [b,]
        b_list.sort()
        if b not in divisor(n):  # もしその数が因数に含まれなければ中断
            break
    if a == b_list:
        score += cul(a)
        print('◎　　　スコア：'+str(score))
    else:
        score += 0
        print('×　　　スコア：'+str(score))
        print('答え  ',end ='')
        print(*a,sep=" × ")  # 間違っているときには答えを表示する
    t -= 1
    if t<=0:
        print('ゲーム終了')  # ゲーム終了の合図を表示
        print('あなたのスコアは'+str(score)+'でした。')
        break