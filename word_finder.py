import re

WORDS = open("./words-5letter.txt").read()


def get_words(orig_pattern="?????", contains="", exclude=""):

    if not orig_pattern:
        orig_pattern = "?????"

    orig_pattern = orig_pattern.lower()
    contains = "".join(contains.lower())
    exclude = "".join(set(exclude.lower()).difference(set(contains)))

    if exclude:
        pattern = orig_pattern.replace("?", f"(?:(?![{exclude}])[a-z])")
        pattern = re.sub("\(([a-z]+)\)", r"(?:(?![\1" + exclude + "])[a-z])", pattern)
    else:
        pattern = orig_pattern.replace("?", f"(?:[a-z])")

    opts = re.findall(pattern, WORDS)

    valid = set()
    for w in opts:
        w_test = w[:]
        flag = True
        for char in set(contains):
            if char not in w_test:
                flag = False
            w_test = "".join(c for c in w_test if c != char)
        if flag:
            valid.add(w)
    return sorted(valid)
