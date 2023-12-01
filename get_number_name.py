def parse_full_info(file_path):
    result_dict = {}

    with open(file_path, 'r', encoding='utf-8') as file:
        current_page = None
        lines_iter = iter(file)

        for line in file:
            if line.startswith('PAGE '):
                current_page = int(line.split()[1])
                result_dict[current_page] = next(lines_iter, None).strip()

    return result_dict

if __name__ == "__main__":
    file_path = "full info.txt"
    parsed_dict = parse_full_info(file_path)

    print(parsed_dict)
