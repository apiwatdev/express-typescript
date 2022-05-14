import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";

class validateDtoRequest {
  data: any;
  error?: { message: string[] };
}
export const validateRequestBodyDto = async (classDto: any, body: string) => {
  
  const result = new validateDtoRequest();
  result.data = await plainToClass(classDto, body);
  result.error = { message: [] };
  await validate(result.data, { skipMissingProperties: true }).then(
    (errors) => {
      if (errors.length > 0) {
        for (const errorItem of errors) {
          const constraints = errorItem.constraints;
          if (constraints) {
            const texts = Object.values(constraints).concat();
            if (result.error) result.error.message.push(...texts);
          }
        }
      }
    }
  );

  if (result.error.message.length == 0) {
    delete result.error;
  }
  return result;
};
