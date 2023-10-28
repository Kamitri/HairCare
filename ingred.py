txt = input()
txt = txt.split(",")
txt = [x.title().strip() for x in txt]
res = ""
for ingredient in txt:
    res += f'"{ingredient}", '
res = res[:-2]
print(res)