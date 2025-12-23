import { useForm, Edit } from "@refinedev/antd";
import {
  Form,
  Input,
  Select,
  InputNumber,
  DatePicker,
  Row,
  Col,
  Card,
} from "antd";
import dayjs from "dayjs";
import { IProject, ProjectStatus } from "../../types";
import { PROJECT_STATUS_LABELS } from "../../utils/constants";

const { TextArea } = Input;

export const ProjectEdit: React.FC = () => {
  const { formProps, saveButtonProps, queryResult } = useForm<IProject>({
    queryOptions: {
      select: (data) => {
        // Преобразуем даты для DatePicker
        return {
          ...data,
          data: {
            ...data.data,
            deadline: data.data.deadline ? dayjs(data.data.deadline) : null,
          },
        };
      },
    },
  });

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Row gutter={24}>
          <Col xs={24} lg={16}>
            <Card title="📝 Основные данные">
              <Form.Item
                label="Название"
                name="title"
                rules={[{ required: true, message: "Введите название" }]}
              >
                <Input placeholder="Название проекта" />
              </Form.Item>

              <Form.Item
                label="Описание"
                name="description"
                rules={[{ required: true, message: "Введите описание" }]}
              >
                <TextArea rows={4} placeholder="Подробное описание проекта..." />
              </Form.Item>

              <Form.Item label="Требования" name="requirements">
                <TextArea
                  rows={6}
                  placeholder="Технические требования, функциональность..."
                />
              </Form.Item>

              <Form.Item
                label="Технический стек"
                name="tech_stack"
                extra="Введите технологии через запятую"
              >
                <Input placeholder="Python, FastAPI, PostgreSQL, React" />
              </Form.Item>
            </Card>

            {/* AI данные */}
            <Card title="🤖 AI данные" style={{ marginTop: 24 }}>
              <Form.Item label="Сгенерированное ТЗ" name="generated_spec">
                <TextArea
                  rows={6}
                  placeholder="Сгенерированное техническое задание..."
                />
              </Form.Item>

              <Form.Item label="AI Оценка времени" name="llm_estimation">
                <TextArea rows={4} placeholder="Оценка времени от LLM..." />
              </Form.Item>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="⚙️ Настройки">
              <Form.Item
                label="Статус"
                name="status"
                rules={[{ required: true, message: "Выберите статус" }]}
              >
                <Select
                  options={Object.entries(PROJECT_STATUS_LABELS).map(
                    ([value, label]) => ({
                      value,
                      label,
                    })
                  )}
                />
              </Form.Item>

              <Form.Item
                label="Бюджет (₽)"
                name="budget"
                rules={[{ required: true, message: "Введите бюджет" }]}
              >
                <InputNumber
                  min={0}
                  step={1000}
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, " ")
                  }
                  parser={(value) => value!.replace(/\s/g, "") as unknown as number}
                />
              </Form.Item>

              <Form.Item label="Дедлайн" name="deadline">
                <DatePicker style={{ width: "100%" }} format="DD.MM.YYYY" />
              </Form.Item>
            </Card>

            <Card title="👥 Участники" style={{ marginTop: 24 }}>
              <Form.Item
                label="ID Заказчика"
                name="customer_id"
                rules={[{ required: true, message: "Укажите заказчика" }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item label="ID Исполнителя" name="assignee_id">
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};

